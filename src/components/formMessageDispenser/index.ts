export default class FormMessageDispenser {
  private messageBlock: HTMLElement;

  private textElement: HTMLDivElement | null;

  constructor(element: HTMLElement) {
    this.messageBlock = element;
    this.textElement = this.messageBlock.querySelector('div');
  }

  public showMessage(message: string): void {
    if (!(this.textElement instanceof HTMLElement)) return;

    this.textElement.textContent = message;
    this.messageBlock.style.display = 'block';
  }

  public hide(): void {
    this.messageBlock.style.display = 'none';
  }
}
