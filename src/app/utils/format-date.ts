  export function formatDateOnly(date: Date): string {
    const dtime = new Date(date);
    dtime.setMinutes(dtime.getMinutes()-dtime.getTimezoneOffset());
    return dtime.toISOString().split('T')[0];
  }

  export function formatDateUTC(date: Date): Date{
    const fechaStr = date.toString();
    const [year, month, day] = fechaStr.split("-").map(Number);
    const fechaUTC = new Date(Date.UTC(year, month - 1 , day + 1));
    return fechaUTC;
  }