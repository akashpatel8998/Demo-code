import React from "react";
import Dialog from "@material-ui/core/Dialog";

class Model extends React.Component {
  render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableScrollLock={true}
       
        >
          {this.props.children}
        </Dialog>
      </div>
    );
  }
}

export default Model;
