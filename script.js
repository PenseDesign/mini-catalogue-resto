// ============================================
// Le Ndolé d'Or — logique panier + commande WhatsApp
// ============================================

// Numéro WhatsApp du restaurant, format 237XXXXXXXXX (sans + ni espaces)
const WHATSAPP_NUMBER = "237691691945";

const cart = {
  'ndole':          { name: 'Ndolé complet', price: 3500, qty: 0 },
  'poulet-dg':       { name: 'Poulet DG', price: 4500, qty: 0 },
  'poisson-braise':  { name: 'Poisson braisé', price: 4000, qty: 0 },
  'eru':             { name: 'Eru traditionnel', price: 3800, qty: 0 },
  'miondo':          { name: 'Miondo (Bâtons de manioc x5)', price: 1000, qty: 0 },
  'bissap':          { name: 'Jus de bissap maison', price: 1000, qty: 0 }
};

function updateCartUI() {
  let total = 0;
  let totalItems = 0;

  for (const [key, item] of Object.entries(cart)) {
    const qtyEl = document.getElementById('qty-' + key);
    if (qtyEl) qtyEl.innerText = item.qty;
    total += item.price * item.qty;
    totalItems += item.qty;
  }

  const totalEl = document.getElementById('cart-total-price');
  const countEl = document.getElementById('cart-item-count');
  const btn = document.getElementById('whatsapp-order-btn');

  if (totalEl) totalEl.innerText = total.toLocaleString('fr-FR');
  if (countEl) countEl.innerText = totalItems;

  if (btn) {
    if (totalItems === 0) {
      btn.classList.add('opacity-50', 'pointer-events-none');
      btn.innerHTML = `<span>Ajoutez un plat pour commander</span>`;
    } else {
      btn.classList.remove('opacity-50', 'pointer-events-none');
      btn.innerHTML = `
        <svg class="w-6 h-6 fill-current text-white flex-shrink-0" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span class="tracking-wide">Commander sur WhatsApp</span>
      `;
    }
  }
}

function filterMenu(filter) {
  document.querySelectorAll('article[data-category]').forEach(article => {
    const match = filter === 'tous' || article.dataset.category === filter;
    article.style.display = match ? '' : 'none';
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    const active = btn.dataset.filter === filter;
    btn.classList.toggle('bg-[#d4a316]', active);
    btn.classList.toggle('text-[#0f271d]', active);
    btn.classList.toggle('font-bold', active);
    btn.classList.toggle('shadow-sm', active);
    btn.classList.toggle('bg-[#214b39]/80', !active);
    btn.classList.toggle('text-[#dbeae2]', !active);
    btn.classList.toggle('font-semibold', !active);
    btn.classList.toggle('border', !active);
    btn.classList.toggle('border-[#31624c]', !active);
  });
}

function changeQty(id, delta) {
  if (cart[id]) {
    cart[id].qty = Math.max(0, cart[id].qty + delta);
    updateCartUI();
  }
}

function handleWhatsAppOrder(e) {
  e.preventDefault();

  const nom = document.getElementById('input-nom').value.trim();
  const telephone = document.getElementById('input-telephone').value.trim();
  const quartier = document.getElementById('input-quartier').value.trim();

  if (!nom || !telephone || !quartier) {
    alert("Merci de renseigner votre nom, votre téléphone et votre quartier avant de commander.");
    if (!nom) document.getElementById('input-nom').focus();
    else if (!telephone) document.getElementById('input-telephone').focus();
    else document.getElementById('input-quartier').focus();
    return;
  }

  const orderLines = [];
  let total = 0;

  for (const [key, item] of Object.entries(cart)) {
    if (item.qty > 0) {
      const subtotal = item.qty * item.price;
      orderLines.push(`• ${item.qty}x ${item.name} (${subtotal.toLocaleString('fr-FR')} FCFA)`);
      total += subtotal;
    }
  }

  if (orderLines.length === 0) {
    alert("Veuillez sélectionner au moins un plat avant de commander.");
    return;
  }

  // Mémorise les infos client pour la prochaine commande
  try {
    localStorage.setItem('ndoleOrClient', JSON.stringify({ nom, telephone, quartier }));
  } catch (err) {}

  const message =
`Bonjour Le Ndolé d'Or ! 👋🍲
Je souhaite passer une commande :

${orderLines.join('\n')}

💰 *Total : ${total.toLocaleString('fr-FR')} FCFA*
📍 *Livraison à :* ${quartier}
📞 *Nom & Contact :* ${nom} - ${telephone}`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappURL, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartUI();
  filterMenu('tous');

  try {
    const saved = JSON.parse(localStorage.getItem('ndoleOrClient'));
    if (saved) {
      document.getElementById('input-nom').value = saved.nom || '';
      document.getElementById('input-telephone').value = saved.telephone || '';
      document.getElementById('input-quartier').value = saved.quartier || '';
    }
  } catch (err) {}
});