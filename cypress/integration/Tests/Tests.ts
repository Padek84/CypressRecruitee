/// <reference types="Cypress" />

describe('Description', () => {
    it('First test', ()=>{
        cy.visit(Cypress.env('mainPage'))
    })
})