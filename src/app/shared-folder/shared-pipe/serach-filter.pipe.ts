import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serachFilter'
})
export class SerachFilterPipe implements PipeTransform {

  filteredLength;

  transform(items: any[], searchText: string, selectedOption: string): any {

    if (!searchText) return items

    if (searchText) {
      let lowerSearchText = searchText.toLowerCase();

      return items.filter((res) => {
        if (selectedOption == 'Search By') {
          return res.name.toString().toLowerCase().includes(lowerSearchText)
        }
        else {
          return res[selectedOption].toString().toLowerCase().includes(lowerSearchText)
        }

      })
    }

  }

}
