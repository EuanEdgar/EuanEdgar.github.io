class Tool {
  constructor(props) {
    this.action = null;

    this.setProps(props);
  }

  setOptions(props) {
    this.setProps(props);
  }

  setProps(props) {
    const {
      commitAction,
      ...otherProps
    } = props;

    Object.entries(otherProps).forEach(([key, value]) => {
      this[key] = value;
    });
    this.parentCommitAction = commitAction || this.parentCommitAction;
  }

  setColour(context, colour) {
    context.strokeStyle = colour;
    context.fillStyle = colour;
  }

  setStrokeWidth(context, strokeWidth) {
    context.lineWidth = strokeWidth;
  }

  onMouseDown() {
    /* Do nothing */
  }

  onMouseUp() {
    /* Do nothing */
  }

  onMouseMove() {
    /* Do nothing */
  }

  commitAction(action) {
    if (this.isValidAction(action)) {
      this.parentCommitAction(action);

      const { toolContext } = this;

      this.action = null;
      toolContext.clearRect(0, 0, toolContext.canvas.width, toolContext.canvas.height);
    }
  }

  cancel() {
    const { toolContext } = this;

    this.action = null;
    toolContext.clearRect(0, 0, toolContext.canvas.width, toolContext.canvas.height);
  }

  pointFromEvent(e) {
    return [e.clientX, e.clientY];
  }
}

export default Tool;
