import { ComponentProps, DisplayComponent, FSComponent, VNode } from '@microsoft/msfs-sdk';

export class VirtualScroll extends DisplayComponent<ComponentProps> {
    static readonly VIEWPORT_HEIGHT_REGEX = /--viewportHeight:\s*([^;]+)/
    private readonly containerRef = FSComponent.createRef<HTMLDivElement>()
    private readonly contentRef = FSComponent.createRef<HTMLDivElement>()
    private readonly scrollbarRef = FSComponent.createRef<HTMLDivElement>()

    private viewportHeight = 0;
    private lastScroll = 0;
    private scrollBarSize = 0;
    private maxScroll = 0;
    private initialY = 0;
    private isScrollDragging = false;
    private bounds?: DOMRect;

    public scrollAmount = 0;

    public getContentContainer() {
        return this.contentRef.instance
    }

    public scrollToBottom() {
        this.scrollAmount = -Infinity
    }

    private update() {
        this.bounds = this.containerRef.instance.getBoundingClientRect()
        this.maxScroll = Math.abs((this.bounds.y + this.bounds.height) - this.viewportHeight)

        if (this.scrollAmount != this.lastScroll) {
            this.lastScroll = this.scrollAmount
            this.contentRef.instance.style.transform = `translateY(${this.scrollAmount}px)`
        }

        this.setScrollBarHeight()
        this.setScrollBarPosition()
        this.setScrollBarVisibility()

        if (!this.scrollingNeeded()) {
            this.scrollAmount = 0
        } else if (Math.abs(this.scrollAmount) > this.maxScroll) {
            this.scrollAmount = -this.maxScroll
        }

        requestAnimationFrame(() => this.update())
    }

    private scrollingNeeded() {
        if (this.bounds) {
            let bottomElementPosition = this.bounds.y + this.bounds.height
            return bottomElementPosition > this.viewportHeight
        }

        return false
    }

    private handleScrollEvent(event: WheelEvent) {
        if (!this.scrollingNeeded()) {
            this.scrollAmount = 0;
        } else {
            this.scrollAmount -= event.deltaY
        }

        if (this.bounds) {
            this.scrollAmount = Math.min(0, Math.max(this.scrollAmount, -this.maxScroll))
        }
    }

    private setScrollBarVisibility() {
        let scrollVisible = this.scrollingNeeded()
        if (scrollVisible && this.scrollbarRef.instance.classList.contains("hidden")) {
            this.scrollbarRef.instance.classList.remove("hidden")
            this.containerRef.instance.style.width = "calc(100% - 10px)"
        } else if (!scrollVisible && !this.scrollbarRef.instance.classList.contains("hidden")) {
            this.scrollbarRef.instance.classList.add("hidden")
            this.containerRef.instance.style.width = "100%"
        }
    }

    private setScrollBarHeight() {
        if (this.bounds) {
            let scrollRequired = this.bounds.y + this.bounds.height
            let scrollRatio = (this.viewportHeight - this.bounds.y) / scrollRequired
            this.scrollBarSize = Math.floor(Math.min(1, scrollRatio) * (this.viewportHeight - this.bounds.y))

            let heightString = `${this.scrollBarSize}px`
            if (this.scrollbarRef.instance.style.height != heightString) {
                this.scrollbarRef.instance.style.height = heightString
            }
        }
    }

    private setScrollBarPosition() {
        if (this.bounds) {
            let scrollPercent = Math.abs(this.scrollAmount / this.maxScroll)

            let translateString = `translateY(${Math.ceil((this.viewportHeight - this.bounds.y - this.scrollBarSize) * scrollPercent)}px)`
            if (this.scrollbarRef.instance.style.transform != translateString) {
                this.scrollbarRef.instance.style.transform = translateString
            }

            let positionString = `${this.bounds.width + 4}px`
            if (this.scrollbarRef.instance.style.left != positionString) {
                this.scrollbarRef.instance.style.left = positionString
            }
        }
    }

    private handleScrollMouseDown(event: MouseEvent) {
        this.isScrollDragging = true
        this.initialY = event.clientY
        this.scrollbarRef.instance.style.backgroundColor = "rgb(255,255,255)"
    }

    private handleScrollMouseUp(event: MouseEvent) {
        this.isScrollDragging = false
        this.scrollbarRef.instance.style.backgroundColor = "var(--primaryColor)"
    }

    private handleMouseMove(event: MouseEvent) {
        if (this.isScrollDragging && this.bounds && this.scrollingNeeded()) {
            let newY = event.clientY - this.initialY
            let maxScrollBarPosition = this.viewportHeight - this.bounds.y - this.scrollBarSize
            let scrollPercent = Math.max(Math.min(newY / maxScrollBarPosition, 1), 0)
            this.scrollAmount = -scrollPercent * this.maxScroll
        }
    }

    public onAfterRender(node: VNode): void {
        this.bounds = this.contentRef.instance.getBoundingClientRect()

        this.containerRef.instance.addEventListener('wheel', (event) => this.handleScrollEvent(event))
        this.scrollbarRef.instance.addEventListener('mousedown', (event) => this.handleScrollMouseDown(event))
        document.addEventListener('mouseup', (event) => this.handleScrollMouseUp(event))
        document.addEventListener('mousemove', (event) => this.handleMouseMove(event))

        this.update()
    }

    public setViewportHeight(height: number) {
        this.viewportHeight = height

        if (!this.scrollingNeeded()) {
            this.scrollAmount = 0
        }
    }

    public render(): VNode | null {
        return (
            <div id="container">
                <div id="content-container" style="overflow: hidden; float: left; width: calc(100% - 10px);" ref={this.containerRef}>
                    <div id="content" ref={this.contentRef}>
                        {this.props.children}
                    </div>
                </div>
                <new-push-button ref={this.scrollbarRef} style="width: 8px; height: 48px; background-color: var(--primaryColor); position: absolute; z-index: 100;" id="scrollbar" />
            </div >
        )
    }
}