const partners = [
  { name: "Андрей Cars", lat: 50.4017, lon: 30.2525 },
  { name: "Auto Max", lat: 50.4450, lon: 30.5200 },
  { name: "DriveLine", lat: 50.4500, lon: 30.5233 }
];

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

document.getElementById("findPartners").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const userLat = position.coords.latitude;
      const userLon = position.coords.longitude;
      let output = "";
      partners.forEach(p => {
        const dist = getDistance(userLat, userLon, p.lat, p.lon).toFixed(1);
        output += `<p>${p.name} — ${dist} км от вас</p>`;
      });
      document.getElementById("partnerList").innerHTML = output;
    });
  } else {
    alert("Геолокация не поддерживается вашим браузером.");
  }
});