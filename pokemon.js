class Selectors {
    constructor(name) {
        this.elHP = document.getElementById(`health-${name}`);
        this.elProgressbar = document.getElementById(`progressbar-${name}`);
        this.elImg = document.getElementById(`img-${name}`);
        this.elName = document.getElementById(`name-${name}`);
    }
}

class Pokemon extends Selectors {
    constructor({ name, hp, type, selectors, attacks = [], img }) {
        super(selectors);

        this.name = name;
        this.hp = {
            current: hp,
            total: hp,
        };
        this.type = type;
        this.attacks = attacks;
        this.img = img;

        if (this.elName) {
            this.elName.innerText = name;
        }

        if (this.elImg && img) {
            this.elImg.src = img;
        }

        this.renderHP();
    }

    changeHP = (count, cb) => {
        this.hp.current -= count;

        if (this.hp.current <= 0) {
            this.hp.current = 0;
        }

        this.renderHP();

        if (cb) {
            cb(count);
        }
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressbarHP();
    }

    renderHPLife = () => {
        const { elHP, hp: { current, total } } = this;
        if (elHP) {
            elHP.innerText = `${current} / ${total}`;
        }
    }

    renderProgressbarHP = () => {
        const { elProgressbar, hp: { current, total } } = this;
        if (!elProgressbar) return;

        const percent = Math.round((current / total) * 100);
        elProgressbar.style.width = `${percent}%`;

        elProgressbar.classList.remove('low', 'critical');

        if (percent < 20) {
            elProgressbar.classList.add('critical');
        } else if (percent < 60) {
            elProgressbar.classList.add('low');
        }
    }
}

export default Pokemon;
