const PH_TIMEZONE = "Asia/Manila";

export function pad(n: number): string {
  return n < 10 ? "0" + n : n.toString();
}

export function getPHTime(): Date {
  return new Date(new Date().toLocaleString("en-US", { timeZone: PH_TIMEZONE }));
}

export function getCountdown(target: Date): string {
  const now = getPHTime();
  const msLeft = target.getTime() - now.getTime();
  if (msLeft <= 0) return "00h 00m 00s";
  const h = Math.floor(msLeft / 3.6e6);
  const m = Math.floor((msLeft % 3.6e6) / 6e4);
  const s = Math.floor((msLeft % 6e4) / 1000);
  return `${pad(h)}h ${pad(m)}m ${pad(s)}s`;
}

export function getNextRestocks(): Record<string, string> {
  const now = getPHTime();
  const timers: Record<string, string> = {};
  
  const nextEgg = new Date(now);
  nextEgg.setMinutes(now.getMinutes() < 30 ? 30 : 0);
  if (now.getMinutes() >= 30) nextEgg.setHours(now.getHours() + 1);
  nextEgg.setSeconds(0, 0);
  timers.egg = getCountdown(nextEgg);
  
  const next5 = new Date(now);
  const nextM = Math.ceil((now.getMinutes() + (now.getSeconds() > 0 ? 1 : 0)) / 5) * 5;
  next5.setMinutes(nextM === 60 ? 0 : nextM, 0, 0);
  if (nextM === 60) next5.setHours(now.getHours() + 1);
  timers.gear = timers.seed = getCountdown(next5);
  
  const nextHour = new Date(now);
  nextHour.setHours(now.getHours() + 1, 0, 0, 0);
  timers.honey = getCountdown(nextHour);

  const next7 = new Date(now);
  const totalHours = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  const next7h = Math.ceil(totalHours / 7) * 7;
  next7.setHours(next7h, 0, 0, 0);
  timers.cosmetics = getCountdown(next7);

  return timers;
}
