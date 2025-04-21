
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Photos from "../pages/Photos";

jest.mock("../components/PhotoGallery", () => () => <div data-testid="gallery-mock">GALLERY</div>);

describe("Photos Seite", () => {
  it("rendert das Layout und die Galerie", () => {
    render(
      <MemoryRouter>
        <Photos />
      </MemoryRouter>
    );
    expect(screen.getByText(/Alle Fotos/i)).toBeInTheDocument();
    expect(screen.getByTestId("gallery-mock")).toBeInTheDocument();
  });
});
