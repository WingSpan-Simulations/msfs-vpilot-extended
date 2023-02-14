import { FSComponent, DisplayComponent, VNode } from "msfssdk";

export class LoadingIcon extends DisplayComponent<any> {
  public render(): VNode {
    return (
      <div id="loading-icon">
        <icon-stack created="true" data-input-group="ICON-STACK">
          <icon-element data-url="/icons/ICON_LOADING.svg" />
        </icon-stack>
      </div>
    );
  }
}
