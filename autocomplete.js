class AutoComplete {
    constructor({ root, fetchData, renderItem, renderSelectedItem }) {
        this.root = root;
        this.fetchData = fetchData;
        this.renderItem = renderItem;
        this.renderSelectedItem = renderSelectedItem;
        this.createBaseHtml();

        this.input = this.root.querySelector("input");
        this.dropDown = this.root.querySelector(".dropdown");
        this.resultsWrapper = this.root.querySelector(".results");

        this.input.addEventListener("input", debounce(this.onInput));
        document.addEventListener("click", (e) => {
            if (!this.root.contains(e.target)) {
                this.dropDown.classList.remove("is-active");
            }
        });
    }

    createBaseHtml = () => {
        this.root.innerHTML = `
            <input type="text" class="input">
            <div class="dropdown">
                <div class="dropdown-menu">
                    <div class="dropdown-content results"></div>
                </div>
            </div>
        `;
    }

    onInput = async (e) => {
        const items = await this.fetchData(e.target.value);
        if (!items.length) {
            this.dropDown.classList.remove("is-active");
            return
        }
        this.fillDropDownConent(items);
    }

    fillDropDownConent = (items) => {
        this.resultsWrapper.innerHTML = "";
        for (let item of items) {
            const itemElement = document.createElement("a");
            itemElement.classList.add("dropdown-item");
            itemElement.addEventListener('click', (e) => {
                this.dropDown.classList.remove("is-active");
                this.input.value = e.target.text;
                this.onItemClick(item);
            });
            itemElement.innerHTML = this.renderItem(item);
            this.resultsWrapper.appendChild(itemElement);
        }
        this.dropDown.classList.add("is-active");
    }

    onItemClick = (item) => {
        this.renderSelectedItem(item);
    };
}