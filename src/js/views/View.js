import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  /**
   * Render the recived object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @param {boolean} [render = true] if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} View instance
   * @author Artur Cempura
   * @todo Finish implementation
   */

  render(data, render = true) {
    // If data array is either unavailable or empty -> render error.
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Particular fragment of data from state is being passed to the render method.
    this._data = data;
    // Respective markup from the child object is being declared to markup const.

    const markup = this._generateMarkup();
    // If the other method calls render method then rendering is turned off = false.
    if (!render) return markup;

    // If render flag is true, the HTML container is being populated with the markup.
    this._clear();
    this._insertHTML(markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Update changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      // Update changed ATTRIBUTES

      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  _insertHTML(markup) {
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>`;
    this._clear();
    this._insertHTML(markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;
    this._clear();
    this._insertHTML(markup);
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
            `;
    this._clear();
    this._insertHTML(markup);
  }
}
