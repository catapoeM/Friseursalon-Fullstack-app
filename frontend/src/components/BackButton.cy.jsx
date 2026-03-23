import BackButton from "./BackButton";
import {mount} from "cypress/react"
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("Back button component", () => {
    it("navigates 1 step back ", () => {
        mount(
            <MemoryRouter initialEntries={["/page1", "/page2"]} initialIndex={1}>
                <Routes>
                    <Route path="/page1" element={<div>Page1</div>}/>
                    <Route path="/page2" element={<BackButton/>}/>
                </Routes>
            </MemoryRouter>
        )
        cy.get('[data-cy="back"]').click()
        
        // Assert we are back on page 1
        cy.contains("Page1").should("exist")
    })
    
})