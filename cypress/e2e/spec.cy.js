describe('ToDo List App', () => {
  beforeEach(() => {
    // Przygotowanie testu - ładowanie strony
    cy.visit('../../index.html')
  })

  it('should add a new task', () => {
    const taskName = 'Nowe zadanie testowe'

    // Wprowadzenie nazwy zadania i kliknięcie przycisku dodawania
    cy.get('#taskInput').type(taskName)
    cy.get('#addTaskBtn').click()

    // Sprawdzenie czy zadanie zostało dodane
    cy.get('#taskList li').should('have.length', 1)
    cy.get('#taskList li span').first().should('have.text', taskName)
  })

  it('should show alert when trying to add an empty task', () => {
    // Monitorowanie alertów
    const stub = cy.stub()
    cy.on('window:alert', stub)

    // Próba dodania pustego zadania
    cy.get('#addTaskBtn')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          'Nazwa zadania nie może być pusta.'
        )
      })

    // Sprawdzenie czy lista zadań jest pusta
    cy.get('#taskList li').should('have.length', 0)
  })

  it('should edit a task', () => {
    const taskName = 'Zadanie do edycji'
    const editedTaskName = 'Zmodyfikowane zadanie'

    // Dodanie zadania
    cy.get('#taskInput').type(taskName)
    cy.get('#addTaskBtn').click()

    // Kliknięcie przycisku edycji
    cy.get('#taskList li button').first().click()

    // Sprawdzenie czy pojawiło się pole do edycji
    cy.get('#taskList li input').should('exist')
    cy.get('#taskList li input').clear().type(editedTaskName)

    // Zatwierdzenie zmian
    cy.get('#taskList li button').first().click()

    // Sprawdzenie czy nazwa zadania została zmieniona
    cy.get('#taskList li span').should('have.text', editedTaskName)
  })

  it('should show alert when trying to save empty task during edit', () => {
    const taskName = 'Zadanie do edycji'

    // Dodanie zadania
    cy.get('#taskInput').type(taskName)
    cy.get('#addTaskBtn').click()

    // Kliknięcie przycisku edycji
    cy.get('#taskList li button').first().click()

    // Monitorowanie alertów
    const stub = cy.stub()
    cy.on('window:alert', stub)

    // Próba zapisania pustego zadania
    cy.get('#taskList li input').clear()
    cy.get('#taskList li button')
      .first()
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          'Nazwa zadania nie może być pusta.'
        )
      })

    // Sprawdzenie czy pole edycji nadal istnieje
    cy.get('#taskList li input').should('exist')
  })

  it('should delete a task', () => {
    const taskName = 'Zadanie do usunięcia'

    // Dodanie zadania
    cy.get('#taskInput').type(taskName)
    cy.get('#addTaskBtn').click()

    // Sprawdzenie czy zadanie zostało dodane
    cy.get('#taskList li').should('have.length', 1)

    // Kliknięcie przycisku usunięcia
    cy.get('#taskList li button').eq(1).click()

    // Sprawdzenie czy zadanie zostało usunięte
    cy.get('#taskList li').should('have.length', 0)
  })

  it('should add multiple tasks and verify their order', () => {
    const tasks = ['Zadanie 1', 'Zadanie 2', 'Zadanie 3']

    // Dodanie kilku zadań
    tasks.forEach((task) => {
      cy.get('#taskInput').type(task)
      cy.get('#addTaskBtn').click()
    })

    // Sprawdzenie czy wszystkie zadania zostały dodane i są w odpowiedniej kolejności
    cy.get('#taskList li').should('have.length', tasks.length)

    cy.get('#taskList li span').each(($el, index) => {
      cy.wrap($el).should('have.text', tasks[index])
    })
  })
})
