import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import EventDetails from "../src/app/details/[id]/page";

describe("EventDetails", () => {
  it("Valida se a Section foi carregada", () => {
    render(<EventDetails />);
    const element = screen.getByTestId("section-agenda");
  });
  it("Valida se o Titulo foi carregado", () => {
    render(<EventDetails />);
    const element = screen.getByTestId("title-page");
  });
});
