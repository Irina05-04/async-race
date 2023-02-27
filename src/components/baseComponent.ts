import { BaseProps, DEFAULT_PROPERTIES } from '../interface/baseInterface';

export default class BaseComponent {
    protected node: HTMLElement;
    constructor({
        tagName = 'div',
        classNames = [],
        textContent = '',
        parentNode,
    }: Partial<BaseProps> = DEFAULT_PROPERTIES) {
        this.node = document.createElement(tagName);
        this.node.classList.add(...classNames);
        this.node.textContent = textContent;
        if (parentNode) {
            parentNode.append(this.node);
        }
    }
    insertChild(child: BaseComponent): void {
        this.node.append(child.getNode());
    }
    remove(): void {
        this.node.remove();
    }
    insertChildS(child: HTMLElement): void {
        this.node.append(child);
    }
    insertChildren(childs: BaseComponent[]): void {
        childs.forEach((el) => {
            this.insertChild(el);
        });
    }
    getNode<T extends HTMLElement = HTMLElement>(): T {
        return this.node as T;
    }
    addClass(className: string): void {
        this.node.classList.add(className);
    }
    removeClass(className: string): void {
        this.node.classList.remove(className);
    }
    setContent(content: string): void {
        this.node.textContent = content;
    }
    getContent() {
        if (this.node.textContent) return this.node.textContent;
    }
    setInnerHTML(html: string): void {
        this.node.innerHTML = html;
    }
    setAttribute(attribute: string, value: string): void {
        this.node.setAttribute(attribute, value);
    }
    getAttribute(attribute: string): string | null {
        if (this.node.getAttribute(attribute) != null) {
            return this.node.getAttribute(attribute);
        } else return null;
    }
    removeAttribute(attribute: string): void {
        this.node.removeAttribute(attribute);
    }
    addListener(event: string, callback: (e?: Event) => void) {
        this.node.addEventListener(event, callback);
    }
    hasAttribute(attribute: string): boolean {
        return this.node.hasAttribute(attribute);
    }
}
