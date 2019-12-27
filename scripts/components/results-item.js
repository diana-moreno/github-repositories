class ResultItem extends Component {
  constructor(container) {
    super(container)
    container.innerHTML = ''
  }

  render(result) {
    const anchor = document.createElement("a")
    anchor.href = result.html_url
    anchor.textContent = result.name

    this.container.append(anchor)
  }
}
