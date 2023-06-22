// =========================== Creating elements ======================================
// Setting up our list of data
const persons = [
  {
    name: "Miss Miss'a'Lot",
    job: "Anything but..."
  },
  {
    name: "Ada Bayron Lovelace",
    job: "Securing developer jobs"
  },
  {
    name: "Arthur Dent",
    job: "Ensuring no one loses their towels"
  }
]

// Get the elements from the document we are intending to use
const addNewCardsButton = document.getElementById("add-to-list")
const listRoot = document.getElementById("generated-list-target")

// Add event listners to elements
addNewCardsButton.addEventListener("click", () => { persons.forEach(createCard) })

/**
 * An event handler for adding a new sets of entries to the document
 */
function addCard() {
  persons.forEach(createCard);
}

// A helper function for generating a people card
function createCard(person) {
  // Create an <li> element
  const liElement = document.createElement("li")

  // Add our class name to the <li> element
  liElement.className = "prospect-card"

  // Create the <h3> and <p> elements
  const h3Element = document.createElement("h3")
  const pElement = document.createElement("p")

  // Set the content of the <h3> and <p> elements
  h3Element.textContent = person.name
  pElement.textContent = person.job

  // Attach the <h3> and <p> elemnt as children of the <li> element
  liElement.appendChild(h3Element)
  liElement.appendChild(pElement)

  // Attach our new element as a child to our list element
  articlesList.appendChild(liElement)
}





// =========================== Fetching Data =======================================


// Get the elements we want to use
const articlesList = document.getElementById("article-list-target")
const articlesButton = document.getElementById("fetch-articles")
articlesButton.addEventListener("click", getArticleData)

async function getArticleData() {
  // Make a request to another web server
  const response = await fetch("https://api.realworld.io/api/articles?limit=20")
  // Get the data from the response we recieved
  const data = await response.json()
  data.articles.forEach(createBlogPost)
}

// The Main function for creating an article component / "compound element"

/**
 * A helper function for generating a people card
 * 
 * @param {Article} article 
 */
function createBlogPost(article) {
  // Create and set header elements
  const header = document.createElement("header")

  const titleContainer = document.createElement("div")
  createChildren(titleContainer, [
    { type: "h3", options: { textContent: article.title } },
    { type: "p", options: { textContent: article.description } },
  ])

  const metaContainer = document.createElement("div")
  createChildren(metaContainer, [
    { type: "h3", options: { textContent: article.author.username } },
    { type: "img", options: { src: article.author.image } },
  ])

  header.appendChild(titleContainer)
  header.appendChild(metaContainer)


  // Create and set "body" element
  const bodyContainer = document.createElement("div")
  createChildren(bodyContainer, [
    { type: "p", options: { textContent: article.body } }
  ])

  // Create and set footer elements
  const footerContainer = document.createElement("footer")
  createChildren(footerContainer, [
    { type: "p", options: { textContent: article.favoritesCount } },
    { type: "p", options: { textContent: article.createdAt } },
  ])

  // Create article root
  const articleElement = document.createElement("article")
  // Append sections to article
  articleElement.appendChild(header)
  articleElement.appendChild(bodyContainer)
  articleElement.appendChild(footerContainer)

  // Append article to document
  articlesList.appendChild(articleElement)
}




// =========================== Utility Functions =======================================
// These functions are helpers for creating new DOM nodes
// You might see their structure better if you delete all the comments

/**
 * Creates an element of type and assigns it any options provided
 * 
 * @param {{
 *  type: keyof HTMLElementTagNameMap
 *  options?: HTMLElement | HTMLImageElement
 * }} createInfo
 * @returns {HTMLElement}
 */
function createNode(createInfo) {
  // Create a new element
  const newChild = document.createElement(createInfo.type)

  // If we recieved any options then
  // copy all the fields from the options object
  // onto the new element
  if (options) {
    Object.assign(newChild, createInfo.options)
  }

  // Return the finished element
  return newChild
}

/**
 * Creates and appends all the elements in the list to the parent
 * 
 * @param {HTMLElement} parent 
 * @param {{
 *  type: keyof HTMLElementTagNameMap
 *  options?: HTMLElement | HTMLImageElement
 * }[]} children 
 */
function createChildren(parent, children) {
  // This could potentially be called with a lot of childrens
  // Attach them first to this in memory fragment
  // This makes the browser only do a single redraw
  // Instead of number of children * redraws
  const fragment = document.createDocumentFragment()

  // Loop through all the childrens and
  // append that element to the fragment
  children.forEach(child => {
    fragment.append(createNode(child))
  })

  // Use the fragment to append all
  // children to the document in one go
  parent.append(fragment)
}




// =========================== Type Definitions =======================================

// Working with data (types) that comes from
// outside this JavaScript file can be difficult
// These type definitions helps some

// Try to use your mouse pointer and hover
// over the 'Article' or 'Author' keywords

// This type definition follows through to
// wherever we set this up, enabling us
// to quickly use VS Code IntelliSens feature
// to autocomplete variables
// Especially usefull for complex objects

// See here for the documentation
// https://jsdoc.app/

// It is called JSDoc

/**
 * @typedef {{
 * slug: string
 * title: string
 * description: string
 * body: string
 * favorited: boolean
 * favoritesCount: number
 * tagList: string[]
 * author: Author
 * createdAt: string
 * updatedAt: string
 * }} Article
 */

/**
 * @typedef {{
 *  username: string
 *  image: URL
 *  bio: string | null
 *  following: boolean
 * }} Author
 */