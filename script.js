// Simple interactivity: project row click, copy contact, form submit demo, theme toggle

document.addEventListener('DOMContentLoaded', ()=>{
  // set year
  document.getElementById('year').textContent = new Date().getFullYear();

  // project detail
  const rows = document.querySelectorAll('.projects-table tbody tr');
  const pd = document.getElementById('projectDetail');
  const pdTitle = document.getElementById('pd-title');
  const pdDesc = document.getElementById('pd-desc');
  const pdTech = document.getElementById('pd-tech');
  const closeBtn = document.getElementById('closeDetail');
  
  rows.forEach(row=>{
    row.addEventListener('click', ()=>{
      const cells = row.querySelectorAll('td');
      pdTitle.textContent = cells[1].textContent;
      pdDesc.textContent = cells[2].textContent;
      pdTech.textContent = cells[3].textContent;
      pd.hidden = false;
      pd.scrollIntoView({behavior:'smooth', block:'center'});
    });
  });
  closeBtn.addEventListener('click', ()=> pd.hidden = true);

  // copy contact
  document.querySelectorAll('[data-copy]').forEach(btn=>{
     btn.addEventListener('click', async ()=>{
       const text = btn.getAttribute('data-copy');
       try{
        await navigator.clipboard.writeText(text);
        btn.textContent = 'Tersalin ✓';
        setTimeout(()=> btn.textContent = text, 1500);        
       }catch(e){
        alert('Salin gagal. Silakan salin manual: ' + text);
       }
     });
   });

  // contact form demo
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const name = form.name.value.trim();
    // demo: tampilkan alert sederhana
    alert(`Terima kasih ${name}! Pesanmu sudah (sementara) diterima.`);
    form.reset();
  });

  // theme toggle - mengganti aksen kalau mau variasi
  const themeBtn = document.getElementById('toggleTheme');
  themeBtn.addEventListener('click', ()=>{
    const root = document.documentElement;
    if(themeBtn.getAttribute('aria-pressed') === 'false'){
      root.style.setProperty('--pink-1', '#ffd1e8');
      root.style.setProperty('--pink-2', '#ff9ccf');
      root.style.setProperty('--accent', '#d63384');
      themeBtn.setAttribute('aria-pressed','true');
    }else{
      root.style.setProperty('--pink-1', '#ff99c8');
      root.style.setProperty('--pink-2', '#ff6fa3');
      root.style.setProperty('--accent', '#ff4d89');
      themeBtn.setAttribute('aria-pressed','false');
    }
  });

});
