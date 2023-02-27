export interface BaseProps {
    tagName: keyof HTMLElementTagNameMap;
    classNames: Array<string>;
    textContent: string;
    parentNode?: HTMLElement;
}
export const DEFAULT_PROPERTIES: BaseProps = { tagName: 'div', classNames: [], textContent: '' };
