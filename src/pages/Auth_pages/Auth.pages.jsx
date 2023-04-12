import React from "react";
import { Button, Icon, Label } from "semantic-ui-react";

export function Auth_pages() {

  const saludo = () => {
    (() => {
      console.log("Hola");
    })()
  }

  return (
    <div>
      <Button as="div" labelPosition="right">
        <Button icon onClick={saludo}>
          <Icon name="heart" />
          Like
        </Button>
        <Label as="a" basic pointing="left">
          2,048
        </Label>
      </Button>
      <Button as="div" labelPosition="left">
        <Label as="a" basic pointing="right">
          2,048
        </Label>
        <Button icon>
          <Icon name="heart" />
          Like
        </Button>
      </Button>
      <Button as="div" labelPosition="left">
        <Label as="a" basic>
          2,048
        </Label>
        <Button icon>
          <Icon name="fork" />
        </Button>
      </Button>
    </div>
  );
}
