import React from "react";

import { ErrorBoundary } from "components/ErrorBoundary";
import { Welcome } from "components/Welcome";
import { Container } from "ui/Container";

const WelcomePage: React.FC = () => {
  return (
    <Container>
      <ErrorBoundary>
        <Welcome />
      </ErrorBoundary>
    </Container>
  );
};

export default WelcomePage;
