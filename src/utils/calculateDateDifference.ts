import dayjs from 'dayjs';

export default function calculateDateDifference(date: string | Date) {
  const today = dayjs();
  const referenceDate = dayjs(date);

  const years = today.diff(referenceDate, 'years', false);

  const monthsReferenceDate = dayjs(date).add(years, 'years');

  const months = today.diff(monthsReferenceDate, 'month', false);

  const daysReferenceDate = dayjs(date).add(years, 'years').add(months, 'months');

  const days = today.diff(daysReferenceDate, 'days', false);

  return `${years ? `${years} anos ` : ''}${months ? `${months} meses ` : ''} ${days ? `${days} dias` : ''}`;
}
