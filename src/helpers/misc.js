export const copyToClipboard = value => navigator.clipboard.writeText(value);

/**
 * Загрузка данных (для useEffect)
 * @param {function} fetch - Функция для вызова
 * @param {number} timeout? - Таймаут для загрузки. Если timeout == false, то вызов функции только один раз
 */
export const fetchInterval = (fetch, timeout) => {
    if (!timeout) {
        return fetch();
    }

    const loadInterval = setInterval(fetch, timeout);

    return () => clearInterval(loadInterval);
};