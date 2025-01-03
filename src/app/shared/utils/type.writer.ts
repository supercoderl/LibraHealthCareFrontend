import { concat, delay, ignoreElements, interval, map, Observable, of, take } from 'rxjs';

export class TypeWriterService {
    static type = ({ word, speed, backwards = false }: { word: string, speed: number, backwards?: boolean }): Observable<any> => {
        return interval(speed).pipe(
            map(x =>
                backwards ? word.substring(0, word.length - x - 1) : word.substring(0, x + 1)
            ),
            take(word.length)
        );
    }

    static typeEffect = (word: string) =>
        concat(
            this.type({ word, speed: 100 }), // type forwards
            of("").pipe(
                delay(1200),
                ignoreElements()
            ), // pause
            this.type({ word, speed: 50, backwards: true }), // delete
            of("").pipe(
                delay(300),
                ignoreElements()
            ) // pause
        );

    static loopEffect = (word: string): Observable<string> => {
        return new Observable<string>((subscriber) => {
            const loop = () => {
                this.typeEffect(word).subscribe({
                    next: (value) => subscriber.next(value), // Gửi từng giá trị đến Observable chính
                    complete: () => loop(), // Lặp lại sau khi hoàn tất
                });
            };
            loop(); // Bắt đầu vòng lặp
        });
    };
}