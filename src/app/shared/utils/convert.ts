export function enumToList(enumObj: any): { value: number; label: string }[] {
    return Object.keys(enumObj)
        .filter((key) => !isNaN(Number(key))) // Lọc ra các giá trị số (id)
        .map((key) => ({
            value: Number(key), // Chuyển chuỗi thành số
            label: enumObj[key], // Lấy tên từ enum
        }));
}

export function getEnumKeyByValue<T>(enumObj: Record<string, any>, value: any): string | undefined {
    return Object.keys(enumObj).find(key => enumObj[key] === value);
}