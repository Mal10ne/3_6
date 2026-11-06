export function random(max, min = 0) {
    const num = max - min;
    return Math.ceil(Math.random() * num) + min;
}

export const countBtn = (count = 6, el) => {
    const innerText = el.innerText;
    el.innerText = `${innerText} (${count})`;

    return () => {
        count--;
        if (count === 0) {
            el.disabled = true;
        }
        el.innerText = `${innerText} (${count})`;
        return count;
    };
};

export const generateLog = (firstPerson, secondPerson, count) => {
    const logs = [
        `[${firstPerson.name}] вспомнил что-то важное, но неожиданно [${secondPerson.name}], не помня себя от испуга, ударил в предплечье врага.`,
        `[${firstPerson.name}] поперхнулся, и за это [${secondPerson.name}] с испугу приложил прямой удар коленом в лоб врага.`,
        `[${firstPerson.name}] забылся, но в это время наглый [${secondPerson.name}], приняв волевое решение, неслышно подойдя сзади, ударил.`,
        `[${firstPerson.name}] пришел в себя, но неожиданно [${secondPerson.name}] случайно нанес мощнейший удар.`,
        `[${firstPerson.name}] поперхнулся, но в это время [${secondPerson.name}] нехотя раздробил кулаком <вырезанно цензурой> противника.`,
        `[${firstPerson.name}] удивился, а [${secondPerson.name}] пошатнувшись влепил подлый удар.`,
        `[${firstPerson.name}] высморкался, но неожиданно [${secondPerson.name}] провел дробящий удар.`,
        `[${firstPerson.name}] пошатнулся, и внезапно наглый [${secondPerson.name}] беспричинно ударил в ногу противника`,
        `[${firstPerson.name}] расстроился, как вдруг, неожиданно [${secondPerson.name}] случайно влепил стопой в живот соперника.`,
        `[${firstPerson.name}] пытался что-то сказать, но вдруг, неожиданно [${secondPerson.name}] со скуки, разбил бровь сопернику.`
    ];

    const logText = logs[random(logs.length) - 1];
    const logResult = `${logText} -${count}, [${firstPerson.hp.current}/${firstPerson.hp.total}]`;

    const $logs = document.querySelector('#logs');
    if ($logs) {
        const $p = document.createElement('p');
        $p.innerText = logResult;
        $logs.insertBefore($p, $logs.children[0]);
    }

    return logResult;
};
