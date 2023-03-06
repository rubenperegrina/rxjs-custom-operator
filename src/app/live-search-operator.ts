import { OperatorFunction, debounceTime, distinctUntilChanged, Observable, filter } from 'rxjs';
const DEFAULT_FILTER = 3;
const DEFAULT_DEBOUNCE_TIME = 300;

export function liveSearchOperator<T>(
    filterFn: (value: T) => boolean,
    debounceTimeFn: number,
    distinctFn: (value: T, otherValue: T) => boolean): OperatorFunction<T, T> {
    return (source: Observable<T>) =>
        source.pipe(
            filter(filterFn || DEFAULT_FILTER),
            debounceTime(debounceTimeFn || DEFAULT_DEBOUNCE_TIME),
            distinctUntilChanged(distinctFn)
        );
}