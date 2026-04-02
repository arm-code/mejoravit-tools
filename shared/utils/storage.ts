

export function getItem<T>(key: string): T | null {

    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : null
    } catch {
        return null
    }

}

export function setItem<T>(key: string, value: T): void {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error('Error guardando en localStorage')
    }
}

export function removeITem(key: string): void {
    localStorage.removeItem(key)

}