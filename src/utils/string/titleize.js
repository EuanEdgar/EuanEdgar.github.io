export default function titleize(string) {
  let starr = string.split(/\s/g);
  starr = starr.map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`);
  return starr.join(' ');
}
