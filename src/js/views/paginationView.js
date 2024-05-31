import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const button = {
      prev: this._generateMarkupButton(curPage, 'prev'),
      next: this._generateMarkupButton(curPage, 'next'),
    };
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return button.next;
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return button.prev;
    }
    // Other page
    if (curPage < numPages) {
      return [button.prev, button.next];
    }
    // Page 1, and there are NO other pages
    return '';
  }
  _generateMarkupButton(curPage, button) {
    return `
    <button data-goto="${
      button === 'prev' ? curPage - 1 : curPage + 1
    }" class="btn--inline pagination__btn--${button}">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-${
      button === 'prev' ? 'left' : 'right'
    }"></use>
      </svg>
      <span>Page ${button === 'prev' ? curPage - 1 : curPage + 1}</span>
      </button>
      `;
  }
}

export default new PaginationView();
