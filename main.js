import Pokemon from './pokemon.js';
import { random, generateLog, countBtn } from './utils.js';
import { pokemons } from './pokemons.js';

// Инициализация игрока 1 (Pikachu) с помощью данных из pokemons.js и spread-оператора
const pikachu = pokemons.find(item => item.name === 'Pikachu');
const player1 = new Pokemon({
    ...pikachu,
    selectors: 'player1',
});

// Инициализация игрока 2 (Charmander)
const charmander = pokemons.find(item => item.name === 'Charmander');
const player2 = new Pokemon({
    ...charmander,
    selectors: 'player2',
});

const $control = document.querySelector('.control');

// Очищаем статическую разметку и генерируем динамические кнопки для всех атак игрока 1 (как на слайдах)
$control.innerHTML = '';

player1.attacks.forEach(item => {
    const $btn = document.createElement('button');
    $btn.classList.add('button');
    $btn.innerText = item.name;

    const btnCount = countBtn(item.maxCount, $btn);

    $btn.addEventListener('click', () => {
        console.log('Click button ', $btn.innerText);
        btnCount();

        // Урон от игрока 1 по игроку 2
        const damage1 = random(item.maxDamage, item.minDamage);
        player2.changeHP(damage1, function (count) {
            console.log('Some change after change HP', count);
            console.log(generateLog(player2, player1, count));
        });

        // Ответный удар игрока 2 первым ударом из доступных
        if (player2.hp.current > 0) {
            const enemyAttack = player2.attacks[0];
            const damage2 = random(enemyAttack.maxDamage, enemyAttack.minDamage);
            player1.changeHP(damage2, function (count) {
                console.log(generateLog(player1, player2, count));
            });
        }
    });

    $control.appendChild($btn);
});
