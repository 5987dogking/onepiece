import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  isAnimating = false;
  prizes = [
    { name: 'A賞：限定珍藏公仔', description: '超精美手辦，限量版收藏品', probability: 10 },
    { name: 'B賞：精緻模型', description: '高質量打造的角色模型', probability: 20 },
    { name: 'C賞：珍藏明信片', description: '限定版藝術明信片組', probability: 30 },
    { name: 'D賞：精美掛飾', description: '可愛實用的角色掛飾', probability: 40 }
  ];

  createConfetti() {
    const emojis = ['🎉', '🎊', '✨', '⭐', '🌟', '💫', '🎈', '🎁'];
    const totalConfetti = 50;

    for (let i = 0; i < totalConfetti; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';

      // 随机选择表情符号
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      confetti.textContent = emoji;

      // 随机左右位置
      confetti.style.left = `${Math.random() * 100}vw`;

      // 随机动画时长和延迟
      const duration = 2 + Math.random() * 2;
      const delay = Math.random() * 0.5;
      confetti.style.animation = `confettiFall ${duration}s ${delay}s linear forwards`;

      // 随机旋转初始角度
      const rotation = Math.random() * 360;
      confetti.style.transform = `rotate(${rotation}deg)`;

      document.body.appendChild(confetti);

      // 动画结束后移除元素
      setTimeout(() => {
        confetti.remove();
      }, (duration + delay) * 1000);
    }
  }

  getRandomPrize() {
    const rand = Math.random() * 100;
    let cumulative = 0;
    for (const prize of this.prizes) {
      cumulative += prize.probability;
      if (rand <= cumulative) {
        return prize;
      }
    }
    return this.prizes[this.prizes.length - 1];
  }

  showResult(prize: any) {
    const resultMessage = document.querySelector('.result-message');
    if (resultMessage) {
      resultMessage.textContent = `恭喜獲得 ${prize.name}！`;
      resultMessage.classList.add('show');
    }

    const prizeTitle = document.querySelector('.prize-title');
    const prizeDescription = document.querySelector('.prize-description');
    if (prizeTitle && prizeDescription) {
      prizeTitle.textContent = prize.name;
      prizeDescription.textContent = prize.description;
    }
  }

  startDraw() {
    if (this.isAnimating) return;

    this.isAnimating = true;
    const card = document.querySelector('.kuji-card') as HTMLElement;
    const button = document.querySelector('.draw-button') as HTMLButtonElement;
    const resultMessage = document.querySelector('.result-message') as HTMLElement;

    if (button) {
      button.disabled = true;
    }
    if (resultMessage) {
      resultMessage.classList.remove('show');
    }

    // 添加搖晃動畫
    if (card) {
      card.style.animation = 'shake 0.5s ease-in-out';
    }
    setTimeout(() => {
      if (card) {
        card.style.animation = '';
      }

      // 翻開卡片
      if (card) {
        card.style.transform = 'rotateY(180deg)';
      }

      const prize = this.getRandomPrize();

      setTimeout(() => {
        this.createConfetti();
        this.showResult(prize);

        setTimeout(() => {
          button.disabled = false;
          button.textContent = '再抽一次';
          this.isAnimating = false;
        }, 1000);
      }, 1000);
    }, 500);
  }

}
