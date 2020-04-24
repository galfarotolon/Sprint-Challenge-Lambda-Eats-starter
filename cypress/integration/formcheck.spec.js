const name = "Guillermo"
const size = "Medium(8 Slices)"
const instructions = 'More cheese!'

it("can navigate to this site", () => {
    cy.visit('http://localhost:3000/pizza')
})




it('can submit a user', () => {
    cy.get('[data-cy_name_input="cy_name_input"]')
        .type(name)
        .should('have.value', name)

    // cy.get('select')
    //     .type("select.1")
    //     .should('have.value', "Medium(8 Slices)")



    // cy.get('.pizza-container > :nth-child(6)')
    //     .type(instructions)
    //     .should('have.value', instructions)



    cy.contains("submit")
        .click()




})


