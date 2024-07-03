import React from "react";

import { Welcome } from "components/Welcome";
import { Container } from "ui/Container";

const WelcomePage: React.FC = () => {
  return (
    <Container>
      <Welcome />
    </Container>
  );
};

export default WelcomePage;
