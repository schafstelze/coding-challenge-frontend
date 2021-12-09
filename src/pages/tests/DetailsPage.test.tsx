import { render } from "@testing-library/react";
import DetailsPage from "../DetailsPage";
import { HashRouter as Router } from "react-router-dom";

const renderComponent = () => {
  return render(
    <Router>
      <DetailsPage />
    </Router>
  );
};

test("should render DetailsPage properly", () => {
  const { asFragment, getByText } = renderComponent();

  const header = getByText(/Item id/i);
  expect(header).toBeInTheDocument();
});
