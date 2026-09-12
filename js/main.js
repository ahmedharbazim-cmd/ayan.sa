// عيان العقارية — سلوك مشترك لكل الصفحات
document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('menuToggle');
  var nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  // أي فورم عليه data-whatsapp="9665XXXXXXXX" بيتحول تلقائيًا لرسالة واتساب معبأة
  document.querySelectorAll('form[data-whatsapp]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var number = form.getAttribute('data-whatsapp');
      var title = form.getAttribute('data-title') || 'طلب جديد من موقع عيان العقارية';
      var lines = [title, ''];
      form.querySelectorAll('[name]').forEach(function (field) {
        var label = field.getAttribute('data-label') || field.name;
        var value = field.value.trim();
        if (value) lines.push(label + ': ' + value);
      });
      var text = encodeURIComponent(lines.join('\n'));
      window.open('https://wa.me/' + number + '?text=' + text, '_blank');
    });
  });

  // زر واتساب العائم: رسالة تلقائية تتضمن اسم الصفحة لسياق أفضل مع فريق المبيعات
  var waFloat = document.querySelector('.wa-float');
  if (waFloat) {
    var pageName = document.title.split('|')[0].trim();
    var waMsg = 'مرحبًا عيان العقارية 👋، أنا مهتم بـ "' + pageName + '" وحاب أعرف أكثر.';
    waFloat.href = waFloat.href.split('?')[0] + '?text=' + encodeURIComponent(waMsg);
  }
});
