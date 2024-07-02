import React, { Component } from "react";

import { SomethingWentWrong } from "ui/SomethingWentWrong";

interface IProps {
  fallback?: React.ReactNode;
  children: React.ReactNode | React.ReactNode[];
}

interface IState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<IProps, IState> {
  static defaultProps = {
    fallback: <SomethingWentWrong />,
  };

  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {
    // logs
  }

  render() {
    const { fallback, children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return fallback;
    }

    return <>{children}</>;
  }
}
