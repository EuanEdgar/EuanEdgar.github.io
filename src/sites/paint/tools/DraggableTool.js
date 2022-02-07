import Tool from './Tool';

class DraggableTool extends Tool {
  onMouseDown(e) {
    if (this.canStartAction()) {
      const point = this.pointFromEvent(e);

      this.startAction();
      this.action.origin = point;
    }
  }

  onMouseMove(e) {
    if (this.action) {
      const point = this.pointFromEvent(e);
      this.action.final = point;

      this.redrawToolLayer();
    }
  }

  onMouseUp() {
    const { action } = this;
    this.commitAction(action);
  }

  isValidAction(action) {
    return action.origin && action.final;
  }
}

export default DraggableTool;
