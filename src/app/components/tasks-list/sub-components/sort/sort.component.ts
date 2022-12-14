import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ITask} from "../../../../../interfaces/ITask";
import {TaskService} from "../../../../../services/task.service";

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css'],
})
export class SortComponent implements OnInit, OnChanges {

  constructor(private service: TaskService) { }

  tasks!:ITask[];

  ngOnInit(): void {
    this.service.tasks.subscribe(t => this.tasks = t);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  sortByNewest() {
    this.service.changeTasks(this.tasks.sort(((a, b) => a.id - b.id)))
  }

  sortByDeadline() {
    const undated:ITask[] = [];

    const newTasks = this.tasks.map(t => {
      if (!t.date) {
        undated.push(t);
        return null;
      }
      return t;
    }).filter(t => t!==null) as ITask[];

    newTasks.sort(((a, b) => a.date!.getTime() - b.date!.getTime()));
    newTasks.push(...undated);
    this.service.changeTasks(newTasks);
  }

  sortByPriority() {
    this.service.changeTasks(this.tasks.sort(((a, b) => b.priority - a.priority)));
  }

}
