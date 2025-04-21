
import React from "react";
import { render, screen } from "@testing-library/react";
import RandomPhoto from "../RandomPhoto";

// Mock des custom hooks, damit keine echten API-Calls gemacht werden
jest.mock("../hooks/use-random-photos", () => ({
  useRandomPhotos: () => ({
    photos: [
      { url: "test-url-1", filename: "test1.jpg" },
      { url: "test-url-2", filename: "test2.jpg" }
    ],
    loading: false,
    handleHidePhoto: jest.fn(),
    fetchRandomPhotos: jest.fn(),
  })
}));

describe("RandomPhoto Komponente", () => {
  it("zeigt Fotos korrekt an", () => {
    render(<RandomPhoto />);
    expect(screen.getByText("test1.jpg")).toBeInTheDocument();
    expect(screen.getByText("test2.jpg")).toBeInTheDocument();
  });

  it("zeigt den Refresh-Button an", () => {
    render(<RandomPhoto />);
    expect(screen.getByText(/Neue Fotos/i)).toBeInTheDocument();
  });
});
