import { render, screen, fireEvent } from "@testing-library/react";
import DeleteConfirmationAlert from "../../components/Alert";
import "@testing-library/jest-dom";

describe("DeleteConfirmationAlert Component", () => {
  const mockOnClose = vi.fn();
  const mockOnConfirm = vi.fn();
  const itemName = "Test Item";

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <DeleteConfirmationAlert isOpen={false} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName={itemName} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render correctly when isOpen is true", () => {
    render(
      <DeleteConfirmationAlert isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName={itemName} />
    );

    expect(screen.getByText("Confirm Deletion")).toBeInTheDocument();

    // Flexible text matcher for confirmation message
    expect(screen.getByText((content) => content.includes(`Are you sure you want to delete this ${itemName}?`)))
      .toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("should call onClose when Cancel button is clicked", () => {
    render(
      <DeleteConfirmationAlert isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName={itemName} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onConfirm with itemName and onClose when Delete button is clicked", () => {
    render(
      <DeleteConfirmationAlert isOpen={true} onClose={mockOnClose} onConfirm={mockOnConfirm} itemName={itemName} />
    );

    fireEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(mockOnConfirm).toHaveBeenCalledWith(itemName);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
