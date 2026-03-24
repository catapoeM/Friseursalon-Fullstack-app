import BackButton from "./BackButton";
import {mount} from "cypress/react"
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("Back button component", () => {
    it("navigates 1 step back ", () => {
        mount(
            <MemoryRouter initialEntries={["/page1", "/page2", "/page3"]} initialIndex={2}>
                <Routes>
                    <Route path="/page1" element={<div>Page1</div>}/>
                    <Route path="/page2" element={<div>Page2</div>}/>
                    <Route path="/page3" element={<BackButton/>}/>
                </Routes>
            </MemoryRouter>
        )
        cy.get('[data-cy="back"]').click()
        // Assert we are back on page 2
        cy.contains("Page2").should("exist")
    })
})

describe("Back button component 44", () => {
    it("navigates 1 step back ", () => {
        mount(
            <MemoryRouter initialEntries={["/page1", "/page2", "/page3"]} initialIndex={2}>
                <Routes>
                    <Route path="/page1" element={<div>Page1</div>}/>
                    <Route path="/page2" element={<div>Page44</div>}/>
                    <Route path="/page3" element={<BackButton/>}/>
                </Routes>
            </MemoryRouter>
        )
        cy.get('[data-cy="back"]').click()
        // Assert we are back on page 2
        cy.contains("Page44").should("exist")
    })
})

describe("Fall back should exists", () => {
    it("It navigates to fallback when no history ", () => {
        mount(
            <MemoryRouter initialEntries={["/page1"]}>
                <Routes>
                    <Route path="/page1" element={<BackButton/>}/>
                    <Route path="/" element={<div>Fallback Path</div>}/>
                </Routes>
            </MemoryRouter>
        )
        cy.get('[data-cy="back"]').click()
        // Assert we are back on page 2
        cy.contains("Fallback Path").should("exist")
    })
})