﻿// <auto-generated />
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Backend.Data.Models.Answer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("GameId")
                        .HasColumnType("integer");

                    b.Property<int>("Points")
                        .HasColumnType("integer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GameId");

                    b.HasIndex("QuestionId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("PlayerId")
                        .HasColumnType("integer");

                    b.Property<int>("SequenceId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.HasIndex("SequenceId");

                    b.ToTable("Games");
                });

            modelBuilder.Entity("Backend.Data.Models.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Players");
                });

            modelBuilder.Entity("Backend.Data.Models.Question", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("CorrectAnswer")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Hint")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Hint2")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("Backend.Data.Models.Sequence", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Sequences");
                });

            modelBuilder.Entity("Backend.Data.Models.SequenceQuestion", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("Order")
                        .HasColumnType("integer");

                    b.Property<int>("QuestionId")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.ToTable("SequenceQuestion");
                });

            modelBuilder.Entity("SequenceSequenceQuestion", b =>
                {
                    b.Property<int>("Part1QuestionsId")
                        .HasColumnType("integer");

                    b.Property<int>("SequenceId")
                        .HasColumnType("integer");

                    b.HasKey("Part1QuestionsId", "SequenceId");

                    b.HasIndex("SequenceId");

                    b.ToTable("SequenceSequenceQuestion");
                });

            modelBuilder.Entity("SequenceSequenceQuestion1", b =>
                {
                    b.Property<int>("Part2QuestionsId")
                        .HasColumnType("integer");

                    b.Property<int>("Sequence1Id")
                        .HasColumnType("integer");

                    b.HasKey("Part2QuestionsId", "Sequence1Id");

                    b.HasIndex("Sequence1Id");

                    b.ToTable("SequenceSequenceQuestion1");
                });

            modelBuilder.Entity("SequenceSequenceQuestion2", b =>
                {
                    b.Property<int>("Part3QuestionsId")
                        .HasColumnType("integer");

                    b.Property<int>("Sequence2Id")
                        .HasColumnType("integer");

                    b.HasKey("Part3QuestionsId", "Sequence2Id");

                    b.HasIndex("Sequence2Id");

                    b.ToTable("SequenceSequenceQuestion2");
                });

            modelBuilder.Entity("Backend.Data.Models.Answer", b =>
                {
                    b.HasOne("Backend.Data.Models.Game", null)
                        .WithMany("Answers")
                        .HasForeignKey("GameId");

                    b.HasOne("Backend.Data.Models.Question", "question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("question");
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.HasOne("Backend.Data.Models.Player", "Player")
                        .WithMany("Games")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", "Sequence")
                        .WithMany("Games")
                        .HasForeignKey("SequenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");

                    b.Navigation("Sequence");
                });

            modelBuilder.Entity("Backend.Data.Models.SequenceQuestion", b =>
                {
                    b.HasOne("Backend.Data.Models.Question", "Question")
                        .WithMany()
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Question");
                });

            modelBuilder.Entity("SequenceSequenceQuestion", b =>
                {
                    b.HasOne("Backend.Data.Models.SequenceQuestion", null)
                        .WithMany()
                        .HasForeignKey("Part1QuestionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", null)
                        .WithMany()
                        .HasForeignKey("SequenceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SequenceSequenceQuestion1", b =>
                {
                    b.HasOne("Backend.Data.Models.SequenceQuestion", null)
                        .WithMany()
                        .HasForeignKey("Part2QuestionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", null)
                        .WithMany()
                        .HasForeignKey("Sequence1Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SequenceSequenceQuestion2", b =>
                {
                    b.HasOne("Backend.Data.Models.SequenceQuestion", null)
                        .WithMany()
                        .HasForeignKey("Part3QuestionsId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Backend.Data.Models.Sequence", null)
                        .WithMany()
                        .HasForeignKey("Sequence2Id")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Backend.Data.Models.Game", b =>
                {
                    b.Navigation("Answers");
                });

            modelBuilder.Entity("Backend.Data.Models.Player", b =>
                {
                    b.Navigation("Games");
                });

            modelBuilder.Entity("Backend.Data.Models.Sequence", b =>
                {
                    b.Navigation("Games");
                });
#pragma warning restore 612, 618
        }
    }
}
