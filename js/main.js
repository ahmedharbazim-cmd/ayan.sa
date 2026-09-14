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

  // إعدادات إرسال نسخة احتياطية من كل طلب فورم للإيميل عبر Web3Forms
  var WEB3FORMS_ACCESS_KEY = 'bbe21ea4-5424-48c7-becb-d2587ae58a11';

  // أي فورم عليه data-whatsapp="9665XXXXXXXX" بيتحول تلقائيًا لرسالة واتساب معبأة
  // وفي نفس الوقت بيتبعت نسخة منه على الإيميل عشان محدش يضيع منه طلب
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

      // إرسال نسخة احتياطية على الإيميل (مايوقفش ولا يأخر فتح الواتساب فوق)
      var payload = { access_key: WEB3FORMS_ACCESS_KEY, subject: title, from_name: 'موقع عيان العقارية' };
      form.querySelectorAll('[name]').forEach(function (field) {
        var label = field.getAttribute('data-label') || field.name;
        var value = field.value.trim();
        if (value) payload[label] = value;
      });
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(function () { /* تجاهل أي خطأ شبكة حتى لا يعطل تجربة المستخدم */ });
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
