const inner = document.getElementById('header-inner');
window.addEventListener('scroll', () => {
  inner.classList.toggle('scrolled', window.scrollY > 50);
});


document.addEventListener('DOMContentLoaded', () => {
  const openBtn  = document.getElementById('open-demo');
  const closeBtn = document.getElementById('close-demo');
  const dialog   = document.getElementById('demo-dialog');
  const demoBtns = document.querySelectorAll('.open-demo');

  demoBtns.forEach(btn =>
    btn.addEventListener('click', () => dialog.showModal())
  );

  openBtn.addEventListener('click', () => {
    dialog.showModal();
  });

  closeBtn.addEventListener('click', () => {
    dialog.close();
  });

  // Opcional: fecha o dialog se clicar fora do formulário
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      dialog.close();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn       = document.getElementById('btn-close');

  closeBtn.addEventListener('click', () => {
    // desmarca o checkbox, fechando o menu
    toggleCheckbox.checked = false;
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.querySelector('label[for="menu-toggle"]').focus();
  });
});

// Mapa de canais → conteúdo
const channelData = {
  whatsapp: {
    title: "WhatsApp Business API",
    subtitle: "Ofereça um suporte instantâneo e simplificado, conectando-se diretamente com seus clientes do WhatsApp.",
    items: [
      "Envie respostas rápidas a perguntas comuns automaticamente.",
      "Centralize os bate-papos para facilitar o gerenciamento.",
      "Compartilhe chats com sua equipe e assegure respostas a todos.",
      "Acompanhe facilmente o histórico de conversas para fornecer melhor suporte."
    ],
    imgSrc: "../assets/images/people.png",
    imgAlt: "Usuário atendendo via WhatsApp"
  },
  instagram: {
    title: "Instagram",
    subtitle: "Gerencie as conversas do Instagram no mesmo hub, sem a necessidade de aplicativos e dispositivos externos.",
    items: [
      "Todas as conversas organizadas e fáceis de gerenciar.",
      "Aumente suas chances de conversão mantendo-se envolvido com seu público.",
      "Envie respostas aos clientes de forma objetiva e estratégica.",
      "Responda em tempo real e aumente a satisfação."
    ],
    imgSrc: "./assets/images/people-instagram.png",
    imgAlt: "Usuário atendendo via Instagram"
  },
  facebook: {
    title: "Facebook Messenger",
    subtitle: "Com a integração do Facebook Messenger, ofereça um atendimento mais próximo e personalizado.",
    items: [
      "Atenda em massa, com mais agilidade e qualidade.",
      "Conecte o Facebook Messenger ao probel sem complicações.",
      "Dicas em tempo real para personalizar seu atendimento.",
      "Chats centralizados para uma comunicação alinhada."
    ],
    imgSrc: "./assets/images/people-messenger.png",
    imgAlt: "Usuário atendendo via Facebook"
  },
  telegram: {
    title: "Telegram",
    subtitle: "Atendimento dinâmico e ágil com a integração do Telegram na plataforma.",
    items: [
      "Conecte rapidamente o Telegram ao probel para uma experiência perfeita.",
      "Atenda com velocidade e foco total no cliente.",
      "Converse no Telegram com mais controle.",
      "probel adapta mensagens do Telegram às necessidades do cliente."
    ],
    imgSrc: "./assets/images/people-telegram.png",
    imgAlt: "Usuário atendendo via Telegram"
  },
  email: {
    title: "Email",
    subtitle: "Com a integração de e-mail, você garante que todas as mensagens sejam respondidas rapidamente.",
    items: [
      "Facilite o gerenciamento de e-mails com uma plataforma central.",
      "Integre e-mail e responda aos clientes com rapidez.",
      "Liberte sua equipe com automação de emails.",
      "Obtenha insights do e-mail para otimizar sua comunicação."
    ],
    imgSrc: "./assets/images/people-email.png",
    imgAlt: "Usuário atendendo via Email"
  },
  website: {
    title: "Website",
    subtitle: "Integre o chat ao vivo no seu website para oferecer suporte imediato aos usuários.",
    items: [
      "Suporte ao vivo para melhorar a experiência do cliente.",
      "Respostas rápidas no chat ao vivo para usuários envolvidos.",
      "Atenda clientes fora do expediente com chatbots automáticos.",
      "Monitore o chat e feedback para aprimorar seu suporte."
    ],
    imgSrc: "./assets/images/people-website.png",
    imgAlt: "Usuário atendendo via Website"
  },
  sms: {
    title: "SMS",
    subtitle: "Conecte-se com clientes por meio de mensagens de texto de forma simples e prática.",
    items: [
      "Alcance clientes rápido com mensagens claras.",
      "Promoções e lembretes entregues direto ao cliente.",
      "Forneça atualizações rápidas e convenientes, aumentando a satisfação do cliente.",
      "Integre SMS perfeitamente à sua estratégia de comunicação existente."
    ],
    imgSrc: "./assets/images/people-sms.png",
    imgAlt: "Usuário atendendo via SMS"
  },
};

// 2) Seletores
const icons      = document.querySelectorAll(".icons-three .icon");
const titleEl    = document.querySelector(".wrapper-items .title");
const subtitleEl = document.querySelector(".wrapper-items .subtitle");
const container  = document.querySelector(".wrapper-items .items-container");
const imageEl    = document.getElementById("channel-image");

// 3) Função para renderizar
function renderChannel(channel) {
  const data = channelData[channel];
  if (!data) return;


  // Coloca os elementos em fade-out
  container.classList.add("fade-out");
  //imageEl.classList.add("fade-out");

  setTimeout(() => {
    // Atualiza título e subtítulo
    titleEl.textContent    = data.title;
    subtitleEl.textContent = data.subtitle;

    // Limpa e preenche lista de itens
    container.innerHTML = "";
    data.items.forEach(text => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <img src="./assets/icons/rectok.svg" alt="ok">
        <p>${text}</p>
      `;
      container.appendChild(div);
    });

    // Atualiza imagem
    imageEl.src   = data.imgSrc;
    imageEl.alt   = data.imgAlt;

    container.classList.remove("fade-out");
    //imageEl.classList.remove("fade-out");

  }, 350);

  
}

// 4) Associa eventos de hover
icons.forEach(icon => {
  icon.addEventListener("mouseenter", () => {
    const channel = icon.dataset.channel;
    renderChannel(channel);
  });
});

// 5) Inicialização: renderiza o primeiro canal
if (icons.length) {
  const first = icons[0].dataset.channel;
  renderChannel(first);
}

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('btn-close');

  toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('no-scroll', toggleCheckbox.checked);
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.body.classList.remove('no-scroll');
  });
});


// document.querySelectorAll('.toggle-btn').forEach(btn => {
//   btn.addEventListener('click', () => {
//     // atualiza visual do toggle
//     document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
//     btn.classList.add('active');

//     const type = btn.dataset.type; // 'mensal' ou 'anual'

//     // para cada card, mostre um e oculte o outro
//     document.querySelectorAll('.plan-card').forEach(card => {
//       const mensalEl = card.querySelector('.plan-price.mensal');
//       const anualEl  = card.querySelector('.plan-price.anual');
//       const mensalEl1 = card.querySelector('.mes');
//       const anualEl1  = card.querySelector('.ano');
      
//       if (type === 'mensal') {
//         mensalEl.style.display = 'flex';
//         anualEl.style.display  = 'none';

//         mensalEl1.style.display = 'flex';
//         anualEl1.style.display = 'none';
//       } else {
//         mensalEl.style.display = 'none';
//         anualEl.style.display  = 'flex';

//         mensalEl1.style.display = 'none';
//         anualEl1.style.display = 'flex';
//       }
//     });

//     // para cada card, mostre um e oculte o outro
//     document.querySelectorAll('.faq-item-icon').forEach(card => {
//       const mensalEl = card.querySelector('.plan-price-mobile-details.mensal');
//       const anualEl  = card.querySelector('.plan-price-mobile-details.anual');
//       const mensalEl1 = card.querySelector('.mes');
//       const anualEl1  = card.querySelector('.ano');

//       console.log(mensalEl)
      
//       if (type === 'mensal') {
//         mensalEl.style.display = 'block';
//         anualEl.style.display  = 'none';

//         mensalEl1.style.display = 'block';
//         anualEl1.style.display = 'none';
//       } else {
//         mensalEl.style.display = 'none';
//         anualEl.style.display  = 'block';
        
//         mensalEl1.style.display = 'none';
//         anualEl1.style.display = 'block';
//       }
//     });
//   });
// });

document.addEventListener('DOMContentLoaded', () => {
  const toggleCheckbox = document.getElementById('menu-toggle');
  const closeBtn       = document.getElementById('btn-close');

  toggleCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('no-scroll', toggleCheckbox.checked);
  });

  closeBtn.addEventListener('click', () => {
    toggleCheckbox.checked = false;
    document.body.classList.remove('no-scroll');
  });
});

// Toggle e accordion
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // ATUALIZA O VISUAL DO BOTÃO
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const type = btn.dataset.type; // 'mensal' ou 'anual'
    const isAnnual = type === 'anual';

    // ADICIONA/REMOVE A CLASSE NO BODY PARA ATIVAR O CSS
    document.body.classList.toggle('anual-active', isAnnual);

    // TROCA OS PREÇOS E TEXTOS 'POR MÊS' / 'POR ANO' NOS CARDS PRINCIPAIS
    document.querySelectorAll('.plan-card').forEach(card => {
      card.querySelector('.plan-price.mensal').style.display = isAnnual ? 'none' : 'flex';
      card.querySelector('.plan-price.anual').style.display  = isAnnual ? 'flex' : 'none';
      card.querySelector('.mes').style.display = isAnnual ? 'none' : 'flex';
      card.querySelector('.ano').style.display  = isAnnual ? 'flex' : 'none';
    });
    
    // TROCA OS PREÇOS E TEXTOS NOS DETALHES (FAQ/ACCORDION)
    document.querySelectorAll('.faq-item-icon').forEach(card => {
      card.querySelector('.plan-price-mobile-details.mensal').style.display = isAnnual ? 'none' : 'block';
      card.querySelector('.plan-price-mobile-details.anual').style.display  = isAnnual ? 'block' : 'none';
      card.querySelector('.mes').style.display = isAnnual ? 'none' : 'block';
      card.querySelector('.ano').style.display  = isAnnual ? 'block' : 'none';
    });

    // TROCA AS IMAGENS
    document.querySelectorAll('img[data-annual-src]').forEach(img => {
        const originalSrc = img.dataset.originalSrc;
        const annualSrc = img.dataset.annualSrc;
        img.src = isAnnual ? annualSrc : originalSrc;
    });

    // TROCA OS TEXTOS
    document.querySelectorAll('[data-text-anual]').forEach(el => {
      const monthlyText = el.dataset.textMensal;
      const annualText = el.dataset.textAnual;
      el.textContent = isAnnual ? annualText : monthlyText;
    });

  });
});

document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement; // .accordion-item
    const isOpen = item.classList.contains('open');

    // fecha todos (se quiser um só aberto por vez)
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      openItem.classList.remove('open');
    });

    // alterna o atual
    if (!isOpen) {
      item.classList.add('open');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards        = document.querySelector('.pricing-cards-info');
  const table        = document.querySelector('.features-table');
  const headerH      = document.querySelector('#header').offsetHeight;
  const tableTop     = table.offsetTop;
  const tableHeight  = table.offsetHeight;
  const buffer       = 200; // px antes do fim da tabela para esconder
  const minWidthShow = 960; // px — abaixo disso nunca exibe

  const tableEndThreshold = tableTop + tableHeight - buffer;

  function updateCardsVisibility() {
    const scrollPos = window.scrollY + headerH;
    const isWide   = window.innerWidth >= minWidthShow;
    const inRange  = scrollPos >= tableTop && scrollPos < tableEndThreshold;

    if (isWide && inRange) {
      cards.classList.add('fixed');
      cards.style.display = 'flex';
    } else {
      cards.classList.remove('fixed');
      cards.style.display = 'none';
    }
  }

  window.addEventListener('scroll', updateCardsVisibility);
  window.addEventListener('resize', updateCardsVisibility);

  // inicializa no load
  updateCardsVisibility();
});