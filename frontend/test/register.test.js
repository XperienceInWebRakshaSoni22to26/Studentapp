import { render, screen, fireEvent } from "@testing-library/react";
import Register from "../src/components/Register.jsx";

test("renders registration form", () => {
            render( < Register setShowRegister = {
                    () => {}
                }
                />);

                expect(screen.getByPlaceholderText("Name")).toBeInTheDocument(); expect(screen.getByPlaceholderText("Email")).toBeInTheDocument(); expect(screen.getByPlaceholderText("Password")).toBeInTheDocument(); expect(screen.getByPlaceholderText("Address")).toBeInTheDocument();
            });