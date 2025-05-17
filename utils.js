import { words } from "./words"

export function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

export function getFarewellText(category) {
    const options = [
        `Oh no, ${category} just ghosted us!`,
        `Yikes! ${category} didn't make the cut.`,
        `Say it ain't so! ${category} is history.`,
        `Welp... ${category} just rage-quit.`,
        `Oops! ${category} has been voted off the island.`,
        `${category} just couldn't hang. Bummer!`,
        `${category} fizzled out like a bad joke.`,
        `Sad trombone... ${category} bit the dust.`,
        `Oh snap! ${category} just rage-uninstalled itself.`,
        `Plot twist: ${category} was a double agent!`,
        `Oops! ${category} just filed for early retirement.`,
        `${category} decided to take a permanent vacation.`,
        `Whoops! ${category} just rage-quit the game.`,
        `Well, that was unexpected... Goodbye, ${category}.`,
        `${category} just joined the Hall of Shame.`,
        `Houston, we lost ${category}.`,
        `Game over for ${category}. Someone hit the reset!`,
        `Spoiler: ${category} didn’t survive this round.`,
        `${category} just got canceled—ouch.`,
        `Gone like a bad meme, ${category} has left the chat.`
    ];

    return options[Math.floor(Math.random() * options.length)];
}
