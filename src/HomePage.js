import React, { useState } from "react";
import {
  Container,
  Grid,
  Header,
  Image,
  Modal,
  Icon,
  List,
  Menu,
  Segment,
  Button,
  Table,
} from "semantic-ui-react";
import logo from "./logo.png";
import output from "./data";

const XLSX = require("xlsx");

function FixedMenuLayout() {
  const handleFile = async (e) => {
    try {
      const file = e.target.files[0];
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(jsonData);
      setOpen(true);
      seterror(false);
    } catch (e) {
      seterror(true);
    }
  };

  const [error, seterror] = useState(false);
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <Modal
        open={open}
        size="small"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        trigger={<Button>Scrolling Content Modal</Button>}
      >
        <Modal.Header>Optimised Departure Timings</Modal.Header>

        <Modal.Content>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>FlightID</Table.HeaderCell>
                <Table.HeaderCell>TSAT</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {output.map((data) => (
                <Table.Row>
                  <Table.Cell>{data.callsign}</Table.Cell>

                  <Table.Cell>{data.tsat}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Modal.Content>

        <Modal.Actions>
          <Button onClick={() => setOpen(false)} primary>
            Close <Icon name="chevron right" />
          </Button>
        </Modal.Actions>
      </Modal>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Image size="mini" src={logo} style={{ marginRight: "1.5em" }} />
            PyDecoders
          </Menu.Item>
          <Menu.Item as="a">Home</Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: "15em", marginBottom: "15em" }}>
        <Header as="h1">Optimization Model For Departure Sequencing</Header>
        <p>Please upload your excel file below</p>

        <p style={{ marginLeft: "90px" }}>
          {" "}
          <input type="file" onChange={(e) => handleFile(e)} />
        </p>

        <p style={{ color: "#F38800" }}>
          {error ? "Please upload the file in xlsx format only" : ""}
        </p>
      </Container>

      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={4}>
              <Header inverted as="h3" content="Chetan- Python Developer" />
              <List link inverted>
                <List.Item
                  as="a"
                  href="https://www.linkedin.com/in/chethan-reddy-0201791ba/"
                >
                  Linkedin
                </List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header inverted as="h3" content="Vamsi- React Developer" />
              <List link inverted>
                <List.Item as="a" href="https://www.linkedin.com/in/vkvamsi24">
                  Linkedin
                </List.Item>
              </List>
            </Grid.Column>

            <Grid.Column width={7}>
              <Header inverted as="h3" content="Location" />
              <p>Vellore Institute Of Technology, Vellore</p>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h3" content="" />
              <Header inverted as="h3" content="" />
            </Grid.Column>
          </Grid>
        </Container>
      </Segment>
    </div>
  );
}

export default FixedMenuLayout;
