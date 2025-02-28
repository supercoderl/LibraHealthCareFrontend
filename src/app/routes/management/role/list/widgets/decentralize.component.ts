import { ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output } from "@angular/core";
import { SharedModule } from "../../../../../shared";
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { Permission, PermissionGroup } from "../../../../../types";
import { _HttpClient } from "@delon/theme";

@Component({
    selector: 'decentralize-role',
    standalone: true,
    imports: [
        SharedModule
    ],
    template: `
        <nz-tree
            [nzData]="nodes"
            nzCheckable
            nzMultiple
            (nzClick)="nzEvent($event)"
            (nzExpandChange)="nzEvent($event)"
            (nzCheckBoxChange)="nzEvent($event)"
        ></nz-tree>
    `
})

export class DecentralizeRoleComponent implements OnInit {
    @Output() selectedPermissionsChange = new EventEmitter<number[]>();
    @Input() permissions!: Permission[];
    @Input() permissionIds!: number[];

    private readonly http = inject(_HttpClient);
    private readonly cdr = inject(ChangeDetectorRef);

    nodes: NzTreeNode[] = [new NzTreeNode({
        title: 'Permissions',
        key: 'All',
        expanded: false
    })];

    permissionsMap: { [key: string]: string[] } = {};
    allPermissions: string[] = []; // Lưu tất cả ID của permission

    groupPermissions(permissions: Permission[]): PermissionGroup[] {
        const grouped = new Map<string, PermissionGroup>();

        permissions.forEach(permission => {
            if (!grouped.has(permission.type)) {
                grouped.set(permission.type, {
                    title: permission.type,
                    key: permission.type,
                    children: [],
                });
            }

            grouped.get(permission.type)!.children.push({
                title: permission.name,
                key: permission.permissionId.toString(),
                isLeaf: true,
                checked: this.permissionIds.includes(permission.permissionId)
            });
        });

        return Array.from(grouped.values());
    }

    async nzEvent(event: NzFormatEmitEvent) {
        if (event.eventName === 'check') {
            let updatedPermissions: string[] = [];

            event?.keys?.forEach(key => {
                if (key === "All") {
                    // Nếu chọn "All", thay nó bằng danh sách tất cả permissionId
                    updatedPermissions = [...this.allPermissions];
                } else if (this.permissionsMap[key]) {
                    // Nếu chọn nhóm, thay nó bằng danh sách quyền con
                    updatedPermissions.push(...this.permissionsMap[key]);
                } else {
                    // Nếu chọn quyền riêng lẻ, giữ nguyên
                    updatedPermissions.push(key);
                }
            });

            // Nếu "All" bị bỏ chọn, reset danh sách
            if (!event?.keys?.includes("All")) {
                updatedPermissions = updatedPermissions.filter(id => this.allPermissions.includes(id));
            }

            // Loại bỏ trùng lặp
            this.selectedPermissionsChange.emit([...new Set(updatedPermissions)].map(e => Number(e)));
        }
    }

    ngOnInit(): void {
        if (this.permissions && this.permissions.length > 0) {
            this.permissionsMap = {};
            this.allPermissions = [];

            if (!(this.nodes[0] instanceof NzTreeNode)) {
                this.nodes[0] = new NzTreeNode(this.nodes[0]);
            }

            this.nodes[0].addChildren(this.groupPermissions(this.permissions));
            this.groupPermissions(this.permissions).forEach(group => {
                const childIds = group.children.map(child => child.key);
                this.permissionsMap[group.key] = childIds;
                this.allPermissions.push(...childIds);
            });

            // ✅ Duyệt qua tất cả nodes để đánh dấu checked nếu chứa permissionId
            const setChecked = (node: NzTreeNode) => {
                if (this.permissionIds.includes(Number(node.key))) {
                    node.isChecked = true;  // Set checked nếu node này có trong permissionIds
                }
                if (node.children && node.children.length > 0) {
                    node.children.forEach(child => setChecked(child));
                    node.isChecked = node.children.every(child => child.isChecked); // ✅ Nếu tất cả children checked thì parent cũng checked
                    node.isHalfChecked = !node.isChecked && node.children.some(child => child.isChecked); // ✅ Nếu chỉ có một số children được chọn, thì parent ở trạng thái indeterminate
                }
            };

            // ✅ Duyệt qua từng node trong cây
            this.nodes.forEach((node: NzTreeNode) => setChecked(node));
        }
    }
}