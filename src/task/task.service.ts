import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class TaskService {

  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,

  ) { }
  async create(createTaskDto: CreateTaskDto,user:any):Promise<Task> {
    try {
      const newTaskData= {...createTaskDto,user:user.id}
      return await this.taskRepository.save(newTaskData)
    } catch (error) {
      throw error
    }
  }

  async findAllTask(user:any):Promise<Task[]> {
    try {
      return await this.taskRepository.find({ 
        where: { user: { id: user.id } },
      });
    } catch (error) {
      throw error
    }

  }
    
  async update(id: number, updateTaskDto: UpdateTaskDto):Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({where:{id:id}});

      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      task.description = updateTaskDto.description || task.description;
      task.completed = updateTaskDto.completed !== undefined ? updateTaskDto.completed : task.completed;
  
      return this.taskRepository.save(task);  
    } catch (error) {
      throw error
    }

  }

  async remove(id: number) {
    try {
      const task = await this.taskRepository.findOne({where:{id:id}});
      if (!task) {
        throw new NotFoundException(`Task with ID ${id} not found`);
      }
      await this.taskRepository.remove(task);
      return {message:"Task deleted successfully!"}
    } catch (error) {
      throw error
    }
  }
}
