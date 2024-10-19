import { createDiv } from "../helpers/createHtmlTags"
import { store } from "../state/store";

export class CounterComponent {
    element: HTMLDivElement | null = null
    count: number | undefined

    updateState() {
        const state = store.getState()
        this.count = state.counter.count
        this.render()
    }

    constructor() {
        this.updateState()
        this.element = this.render()
    }

    setCounter() {
        store.dispatch({ type: "INCREMENT" })
        this.updateState()
    }

    render() {
        const counter = createDiv(`
            <div>Counter</div>
            <div class="button" style="cursor:pointer">add</div>
            <div>${this.count}</div>
         `)


        counter.querySelector<HTMLDivElement>('.button')!.addEventListener('click', this.setCounter.bind(this))

        if (this.element) {
            this.element.replaceWith(counter); // Replace the old counter with the new one
        }

        this.element = counter;

        return counter
    }
}